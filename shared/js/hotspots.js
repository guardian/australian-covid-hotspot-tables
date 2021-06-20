import dataTools from "shared/js/dataTools"
import ColorScale from "shared/js/colorscale"
import contains from "shared/js/contains"
import createTable from "shared/js/table/createTable"
import addCustomCSS from "shared/js/table/addCustomCSS"
import propComparator from "shared/js/table/propComparator"
import styleHeaders from "shared/js/table/styleHeaders"
import colourize from "shared/js/table/colourize"
import mustache from "shared/js/mustache"

import matchArray from "shared/js/table/matchArray"

export class Hotspots {
  constructor(results, target) {

    const self = this

    this.showingRows = true
    const table = document.querySelector("#int-table")
    const data = results.sheets[target]
    const details = results.sheets.template
    const options = results.sheets.options
    const userKey = results["sheets"]["key"]
    const headings = Object.keys(data[0])

    this.searchEl = document.getElementById("search-field");

    /*
    data.forEach(function(row) {
      for (let cell of headings) {
        row[cell] = (typeof row[cell] === "string" && !isNaN(parseInt(row[cell]))) ? +row[cell] : row[cell]
      }
    });
    */
    
    createTable(table, headings, options[0].enableSort)
    
    addCustomCSS(headings, options[0].format)

    colourize(headings, userKey, data, ColorScale).then(data => {

      self.data = data

      self.setup(options)

    })

  }

  setup(options) {

    var self = this

    this.render()

    

    if (options[0].enableSearch==='TRUE') {
      document.querySelector("#search-container").style.display = "block";
      this.searchEl.addEventListener("input", () => self.render(this.value));
      this.searchEl.addEventListener("focus", () => { if (this.value === "Search") { this.value = ""}});
    }

    if (options[0].enableSort==='TRUE') {
      this.currentSort = null
      document.querySelector("tr").addEventListener("click", (e) => self.sortColumns(e));
    }

    if (options[0].format==='truncated') {
      this.showingRows = false
      document.querySelector("#untruncate").style.display = "block";
      document.querySelector("#untruncate").addEventListener("click", (button) => {
        self.showingRows = (self.showingRows) ? false : true ;
        self.render()
      });

    }

  }

  sortColumns(e) {

    var self = this

    this.data = this.data.sort(propComparator(e.target.cellIndex));

    styleHeaders(e)

    this.render()

  }

  render() {

    console.log(this.searchEl.value)

    const self = this

    const tbodyEl = document.querySelector("#int-table tbody");

    const template = `{{#rows}}
        <tr {{#getIndex}}{{/getIndex}}>
            {{#item}}
                <td {{#styleCheck}}{{/styleCheck}} class="column"><span class="header-prefix"></span><span>{{{value}}}</span></td>
            {{/item}}
        </tr>
    {{/rows}}`;

    const rowsToRender = (this.searchEl && this.searchEl.value !== ""  && this.searchEl.value.length > 2) ? self.data.filter(function(item) {

      var results = item[0].meta.toLowerCase()

      if (results.includes(self.searchEl.value.toLowerCase())) {

          return item

      }

    }) : self.data ;


    const finalRows = rowsToRender.map((item,index) => {
      return { index : index , item : item}
    })

    const styleCheck = function() {
      return (this.color) ? `style="background-color:${this.color};text-align:center;color:${this.contrast};"` :
      (!isNaN(this.value)) ? `style="text-align:center;"` : ''
    }

    const getIndex = function() {
      return (this.index >= 10 && !self.showingRows) ? `style="display:none;"` : ""
    }

    const html = mustache( template, { rows : finalRows, styleCheck : styleCheck, getIndex : getIndex })

    tbodyEl.innerHTML = html;

  }

}
