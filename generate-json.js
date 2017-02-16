const fs = require('fs')
const cheerio = require('cheerio')

const selector = 'body > div.shell.container-content-main > div.gh-shell > div.container_24.clear > div.grid_16.gh-content > div.grid_12.push_4.alpha.omega.bodyCopy.gh-content'

const file = fs.readFileSync('./fixtures/side-quests.html').toString()
const $ = cheerio.load(file)


const contentNode = $(selector)

// TODO Match 'Chapter' and 'Ch'
const chapterRegex = /(.*)\(Chapter\ (\d{1,2})\)/

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

const data = $('h3.gh-sectionHeader', contentNode).toArray().map((element, index) => {
    const e = $(element)
    const region = e.contents().filter(function () { 
        return !(this.name === "a" && this.attribs.hasOwnProperty('class'))
    }).text().replace(' Side Quests', '').replace(' Side Quest', '')
    const table = e.next().next()

    const data = $('tr', table).toArray().map((rawTr, i) => {
        if(i === 0) {
            return undefined;
        }
        const tr = $(rawTr); 
        const tds = $('td', tr).toArray()

        // Regular quests
        const isCid = tds.length === 2
        return tds.map((rawTd, i) => {
            if(isCid) {
                if(i == 1) {
                    return getRewards($(rawTd))
                } else {
                    return $(rawTd).text().trim()
                }
            } else {
                if(i == 3) {
                    const td = $(rawTd)

                    return getRewards(td)
                } else {
                    return $(rawTd).text().trim()
                }
            }
         })
    })
    .filter((e) => e != undefined)
    .map((quest) => {

        // Cid
        if(Object.keys(quest).length == 2) {

            return {
                name: quest[0],
                rewards: quest[1]
            }
        }

        const result = chapterRegex.exec(quest[2])
        let location, chapter
        if(result === null || result.length !== 3) {
            location = quest[2]
        } else {
            location = result[1]
            chapter = result[2]
        }
        return {
            name: quest[0],
            level: quest[1],
            chapter, location,
            rewards: quest[3]
        }
    })

    // TODO Location + (maybe) Chapter -> Location + Chapter


    return {region, data}
}).reduce((acc, val) => {
    return acc.concat(val.data.map((e) => Object.assign(e, {region: val.region})))
}, [])

fs.writeFileSync('./side-quests.json', JSON.stringify(data))