const fs = require('fs')
const cheerio = require('cheerio')
const _ = require('lodash')

// Selector to the main section
const ghContentSelector = 'body > div.shell.container-content-main > div.gh-shell > div.container_24.clear > div.grid_16.gh-content > div.grid_12.push_4.alpha.omega.bodyCopy.gh-content'

function getRewards(td) {
    return td.contents()
        .filter(function(){
            return this.nodeType == 3
        })
        .map(function(){ 
            return this.data 
        })
        .toArray()
        .map((e) => e.trim().replace(',', ''))
        .filter((s) => s.length > 0)
}

function parseIGNWikiPage(file, regionSuffixToReplace, parseRow, arrToQuestObject) {
    const $ = cheerio.load(file)
    const contentNode = $(ghContentSelector)

    return $('h3.gh-sectionHeader', contentNode).toArray().map((element, index) => {
        const e = $(element)

        const region = e.contents()
            .filter(function () { 
                return !(this.name === "a" && this.attribs.hasOwnProperty('class'))
            }).text()
            .replace(regionSuffixToReplace + 's', '')
            .replace(regionSuffixToReplace, '')

        const table = e.next().next()

        const data = $('tr', table).toArray()
            .map((rawTr, i) => {
                // Ignore Headers
                if(i === 0) {
                    return undefined
                }
                const tr = $(rawTr) 
                const tds = $('td', tr).toArray()

                return parseRow($, tds)
            })
            .filter((e) => e != undefined)
            .map(arrToQuestObject)

        return {region, data}
    }).reduce((acc, val) => {
        return acc.concat(val.data.map((e) => Object.assign(e, {region: val.region})))
    }, [])
}


//
// Side Quests functions
//

function parseQuestRow($, tds) {
    const isCid = tds.length === 2
    return tds.map((rawTd, i) => {
        if(isCid) {
            if(i == 0) {
                return [
                    $(rawTd).text().trim(),
                    _.find(rawTd.children, (c) => c.name === 'a').attribs.href
                ]
            } else if(i == 1) {
                return getRewards($(rawTd))
            } else {
                return $(rawTd).text().trim()
            }
        } else {
            if(i == 0) {
                const a = _.find(rawTd.children, (c) => c.name === 'a')
                return [
                    $(rawTd).text().trim(),
                    (a != undefined) ? a.attribs.href : undefined
                ]
            } else if(i == 3) {
                const td = $(rawTd)

                return getRewards(td)
            } else {
                return $(rawTd).text().trim()
            }
        }
    })
}

// TODO Match 'Chapter' and 'Ch'
const chapterRegex = /(.*)\(Chapter\ (\d{1,2})\)/

function arrToQuestObject(arr) {
    // Cid
    if(arr.length === 2) {
        return {
            name: arr[0][0],
            link: arr[0][1],
            rewards: arr[1]
        }
    }

    // Side quests
    const result = chapterRegex.exec(arr[2])
    let location, chapter
    if(result === null || result.length !== 3) {
        location = arr[2]
    } else {
        location = result[1]
        chapter = parseInt(result[2], 10)
    }
    return {
        name: arr[0][0],
        link: arr[0][1],
        level: parseInt(arr[1], 10),
        chapter, location,
        rewards: arr[3]
    }
}

//
// Hunts functions
//

function parseHuntsRow($, tds) {
    const isAltissia = tds.length === 5;
    return tds.map((rawTd, i) => {
        if(isAltissia) {
            if(i === 4) {
             return getRewards($(rawTd))
            } else {
                return $(rawTd).text().trim()
            }
        } else {
            if(i === 3 || i === 5) {
                return getRewards($(rawTd))
            } else {
                return $(rawTd).text().trim()
            }
        }
    })
}

function arrToHuntObject(arr) {
    // Altissia
    if(arr.length === 5) {
        return {
            name: arr[0],
            level: parseInt(arr[1], 10),
            location: arr[2],
            enemy: arr[3],
            rewards: arr[4]
        }
    }

    // Regular hunts
    
    // TODO Regex on habitat to extract time 
    // TODO Regex on each enemy to extract number
    // TODO Regex on Location for (region, location, hunter rank)
    return {
        name: arr[0],
        level: arr[1],
        location: arr[2],
        enemy: arr[3],
        habitat: arr[4],
        rewards: arr[5]
    }
} 

//
// Effectively parsing files
//

const sideQuests = parseIGNWikiPage(
    fs.readFileSync('./fixtures/side-quests.html').toString(),
    ' Side Quest', parseQuestRow, arrToQuestObject
)
const hunts = parseIGNWikiPage(
    fs.readFileSync('./fixtures/bounty-hunts.html').toString(),
    ' Bounty Hunts', parseHuntsRow, arrToHuntObject
)

fs.writeFileSync('./data/side-quests.json', JSON.stringify(sideQuests))
fs.writeFileSync('./data/hunts.json', JSON.stringify(hunts))