// * created by : Abdul Muttaqin
// 25-040-2022

const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

const randomUseragent = require('random-useragent');

const fs = require('fs');
const {
    request
} = require("http");

puppeteer.use(StealthPlugin());


const konfigbrowser = {
    headless: false,
    args: [
        "--log-level=3", // fatal only

        "--no-default-browser-check",
        "--disable-infobars",
        "--disable-web-security",
        "--disable-site-isolation-trials",
        "--no-experiments",
        "--ignore-gpu-blacklist",
        "--ignore-certificate-errors",
        "--ignore-certificate-errors-spki-list",
        "--mute-audio",
        "--disable-extensions",
        "--no-sandbox",

        "--no-first-run",
        "--no-zygote"
    ],


};

async function startApp(user,pass) {
    try {


        const browser = await puppeteer.launch(konfigbrowser);
        let url;
        const page = await browser.newPage();


        await page.goto('https://www.tiktok.com/login/phone-or-email/email', {
            waitUntil: "networkidle2"
        })

        page.on('response', async (response) => {



            if (response.url().includes('api/search/general/full/')) {
                url = response.url();
            }

        });

        await page.type("#root > div > div.tiktok-web-body-33PDi > form > div.form-container-3hjAo > div > input[type=text]",
            user, {
                delay: 10
            })
        await page.type("#root > div > div.tiktok-web-body-33PDi > form > div.form-container-3WLeZ > div > input[type=password]", pass,
        {
            delay: 10
        });
        await page.click("#root > div > div.tiktok-web-body-33PDi > form > button");

        await page.waitForSelector("#app > div.tiktok-19fglm-DivBodyContainer.eg65pf90 > div.tiktok-1id9666-DivMainContainer.evzvjqg0");
        await page.goto("https://www.tiktok.com/search?q=%23fyp");




        let number = [
            "0",
            "6",
            "12",
            "24",
            "36",
            "48",
            "60",
            "72",
            "84",
            "96",
            "108",
            "120",
            "132",
            "144",
            "156",
            "168",
            "180",
            "192",
            "204",
            "216",
            "228",
            "240",
            "252",
            "264",
            "276",
            "288",
            "300",
            "312",
            "324",
            "336",
            "348",
            "360",
            "372",
            "384",
            "396",
            "408",
            "420",
            "432",
            "444",
            "456",
            "468",
            "480",
            "492",
            "504",
            "516",
            "528",
            "540",
            "552",
            "564",
            "576",
            "588",
            "600",
            "612",
            "624",
            "636",
            "648",
            "660",
            "672",
            "684",
            "696",
            "708",
            "720",
            "732",
            "744",
            "756",
            "768",
            "780",
            "792",
            "804",
            "816",
            "828",
            "840",
            "852",
            "864",
            "876",
            "888",
            "900",
            "912",
            "924",
            "936",
            "948",
            "960",
            "972",
            "984",
            "996",
            "1008",
            "1020",
            "1032",
            "1044",
            "1056",
            "1068",
            "1080",
            "1092",
            "1104",
            "1116",
            "1128",
            "1140",
            "1152",
            "1164",
            "1176",
            "1188",
            "1200",
            "1212",
            "1224",
            "1236",
            "1248",
            "1260",
            "1272",
            "1284",
            "1296",
            "1308",
            "1320",
            "1332",
            "1344",
            "1356",
            "1368",
            "1380",
            "1392",
            "1404",
            "1416",
            "1428",
            "1440",
            "1452",
            "1464",
            "1476",
            "1488",
            "1500",
            "1512",
            "1524",
            "1536",
            "1548",
            "1560",
            "1572",
            "1584",
            "1596",
            "1608",
            "1620",
            "1632",
            "1644",
            "1656",
            "1668",
            "1680",
            "1692",
            "1704",
            "1716",
            "1728",
            "1740",
            "1752",
            "1764",
            "1776",
            "1788",
            "1800",
            "1812",
            "1824",
            "1836",
            "1848",
            "1860",
            "1872",
            "1884",
            "1896",
            "1908",
            "1920",
            "1932",
            "1944",
            "1956",
            "1968",
            "1980",
            "1992",
            "2004",
            "2016"
        ]

        for (let i = 0; i < number.length; i++) {
            await page.goto("https://t.tiktok.com/api/search/general/full/?aid=1988&app_language=id-ID&history_len=7&is_fullscreen=false&is_page_visible=true&keyword=fyp&offset=" + number[i], {
                waitUntil: "networkidle2"
            })

            await page.waitForSelector("body");
            const data = await page.content();
            const json = JSON.parse(data.replace(/<script[^>]*>([\s\S]*?)<\/script>/g, '').replace(/<\/?[^>]+(>|$)/g, ''));
            try {


                for (let i = 0; i < json.data.length; i++) {
                    var resdata = json.data[i]
                    if (resdata.item.author.verified) {
                        const user = fs.readFileSync('./result.txt', 'utf8')
                        if (user.indexOf(resdata.item.author.uniqueId)) {

                            const resultfile = `
             ======== RESULT FOR =======
            
            Username : ${resdata.item.author.uniqueId}
            Followers : ${resdata.item.authorStats.followerCount}
            Following : ${resdata.item.authorStats.followingCount}
            Heart Count : ${resdata.item.authorStats.heartCount}
            Video Count : ${resdata.item.authorStats.videoCount}  
            Verified : ${resdata.item.author.verified ? "true" : "false"}

            =========================
            `;
                            console.log(resultfile);
                            if (resdata.item.author.verified == true) {
                                fs.appendFileSync('./result.txt', resultfile + '\n');
                            }
                        }

                    } else {
                        console.log("already exist");
                    }
                }
            } catch (error) {
                continue;
            }
        }
    } catch (error) {
        console.log(error);
    }
}

startApp("yourusername","yourpass");
