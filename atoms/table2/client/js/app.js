// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

import data from 'shared/js/data'
import { Hotspots } from 'shared/js/hotspots'
import groupBy from "shared/js/groupBy"

fetch("https://interactive.guim.co.uk/covidfeeds/victoria-2020-covid-tables.json")
    .then(res => res.json())
    .then(data => {

        var groups = groupBy(data.sheets.table2, ['Location', 'Site'], "Date" );

        for (const group of groups) {

            var datelist = data.sheets.table2.map(item => {

                if (group.Location === item.Location && group.Site === item.Site) {

                    return item["Date"]

                }

            })

            var filtered = datelist.filter(Boolean);

            group["Date"] = filtered.join(', ');

        }

        data.sheets.table2 = groups

        data.sheets.table2 = data.sheets.table2.sort((a,b) => (a.Location > b.Location) ? 1 : ((b.Location > a.Location) ? -1 : 0)); 

    	new Hotspots(data, "table2")

    });
