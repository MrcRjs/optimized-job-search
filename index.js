#!/usr/bin/env node
import open from 'open';

async function main() {
    const query = generateSEJobQuery("LAST_MONTH");
    const url = new URL(`https://www.google.com/search?q=${query}`).toString();
    console.log(url);
    await open(url);
};

const SITES = [
    "dice.com",
    "indeed.com",
    "angel.com",
    "lever.co",
    "greenhouse.io",
    "jobs.ashbyhq.com",
    "app.dover.io"
];

const ROLES = [
    "engineer",
    "developer"
];

const KEYWORDS = [
    "typescript",
    "remote"
];

const EXCLUDES = [
    // "senior",
    "intern",
    "junior",
    "staff",
    "sr.",
    "lead",
    "principal",
    "angular"
];

function generateSEJobQuery(from = "LAST_DAY") {
    const sitesStr = SITES.map(s => `site:${s}`).join(" | ");
    const rolesStr = `(${ROLES.join(' AND ')})`;
    const keywordsStr = `(${KEYWORDS.join(' | ')})`;
    const excludeStr = EXCLUDES.map(e => `-${e}`).join(' ');
    const fromStr = `after:${formatDate(fromDate(from))}`;
    return `${sitesStr} ${rolesStr} ${keywordsStr} ${excludeStr} ${fromStr}`;
}

function fromDate(from) {

    if(from === "LAST_DAY") {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        return new Date(year, month, today.getDate() - 1);
    }
    else if(from === "LAST_WEEK") {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        return new Date(year, month, today.getDate() - 7);
    }
    else if(from === "THIS_MONTH") {
        return new Date(today).setDate(1);
    }
    else if(from === "LAST_MONTH") {
        return getNthPreviousMonth(1);
    }
    else if(from === "TWO_MONTHS") {
        return getNthPreviousMonth(2);
    }
    else if(from === "THREE_MONTHS") {
        return getNthPreviousMonth(3);
    }
    return today;
}

function formatDate(d = new Date()) {
    return d.toISOString().slice(0,10);
}

function getNthPreviousMonth(n = 1) {
    const today = new Date();
    const nthPreviousMonth = today.getMonth() - n;
    const year = today.getFullYear();
    
    // If the previous month is January, we need to subtract 1 from the year
    if (nthPreviousMonth < 0) {
        nthPreviousMonth = 11;
        year--;
    }
    
    return new Date(year, nthPreviousMonth, 1);
}

main();