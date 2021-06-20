// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

import data from 'shared/js/data'
import { Hotspots } from 'shared/js/hotspots'
import groupBy from "shared/js/groupBy"

fetch("https://interactive.guim.co.uk/embed/aus/feeds/covid/public-exposure-sites-in-victoria.json")
    .then(res => res.json())
    .then(data => {

        /*
        var groups = groupBy(data.sheets.table3, ['Location', 'Site'], "Date" );

        for (const group of groups) {

            var datelist = data.sheets.table3.map(item => {

                if (group.Location === item.Location && group.Site === item.Site) {

                    return item["Date"]

                }

            })

            var filtered = datelist.filter(Boolean);

            group["Date"] = filtered.join(', ');

        }

        data.sheets.table3 = groups

        */

        // data.sheets.table3 = data.sheets.table3.sort((a,b) => (a.Location > b.Location) ? 1 : ((b.Location > a.Location) ? -1 : 0)); 

    	new Hotspots(data, "table")

    });