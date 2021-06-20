// if you want to import a module from shared/js then you can
// just do e.g. import Scatter from "shared/js/scatter.js"

import data from 'shared/js/data'
import { Hotspots } from 'shared/js/hotspots'
import groupBy from "shared/js/groupBy"


// Very handy stuff in here
// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects

fetch(`https://data.nsw.gov.au/data/dataset/0a52e6c1-bc0b-48af-8b45-d791a6d8e289/resource/f3a28eed-8c2a-437b-8ac1-2dab3cf760f9/download/covid-case-locations-20210104b.json?t=${new Date().getTime()}`)
    .then(res => res.json())
    .then(json => {


    	var results = json.data.monitor.map(item => {
    		return { 
    			"Suburb" : item.Suburb,
    			"Venue" : item.Venue,
    			"Date and time" : `${item.Time} on ${item.Date}`,
    			"Health advice" : item.HealthAdviceHTML //.replace(/(<([^>]+)>)/gi, "")
    		}
    	})

        var groups = groupBy(results, ['Suburb', 'Venue', 'Health advice'], "Date and time" );

        for (const group of groups) {

            var datelist = results.map(item => {

                if (group.Suburb === item.Suburb && group.Venue === item.Venue && group["Health advice"] === item["Health advice"]) {

                    return item["Date and time"]

                }

            })

            var filtered = datelist.filter(Boolean);

            group["Date and time"] = filtered.join(', ');

        }

        data.sheets.data = groups

        data.sheets.data = data.sheets.data.sort((a,b) => (a.Suburb > b.Suburb) ? 1 : ((b.Suburb > a.Suburb) ? -1 : 0)); 

        console.log(data)

    	new Hotspots(data, "data")

    });
