import { Component, OnInit } from '@angular/core';
import { DemoService } from '../service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  type = 'posts';
  data = [];
  cache = [];
  titles = [];
  loading = true;
  sort = 'bottom';
  col = 'nope';
  filterString = '';
  validSorts = ['title', 'id', 'userId'];

  constructor(private service: DemoService) {}

  getTitles(data) {
    return data && data.length > 0 ? Object.keys(data[0]) : [];
  }

  sortClick(title) {
    if (this.validSorts.indexOf(title) > -1) {
      if (this.col !== title) {
        this.col = title;
        this.sort = 'bottom'
      } else {
        this.sort = this.sort === 'bottom' ? 'top' : 'bottom';
      }
      this.doSort();
    }
  }

  doSort() {
    const { col, sort } = this;

    if (col !== 'nope') {
      if (sort === 'bottom') {
        this.data = this.data.sort((a, b) => (
          typeof a[col] !== 'string' ? b[col] - a[col] : b[col].charCodeAt(0) - a[col].charCodeAt(0)
        ));
      } else {
        this.data = this.data.sort((a, b) => (
          typeof a[col] !== 'string' ? a[col] - b[col] : a[col].charCodeAt(0) - b[col].charCodeAt(0)
        ));
      }
    }
  }

  massageData(filterString, data) {
    if (filterString.indexOf('AND') > -1) {
      const indexOfAND = filterString.indexOf('AND');

      if (indexOfAND) {
        const fstr = filterString.slice(0, indexOfAND);
        const newfstr = filterString.substr(indexOfAND + 3);
        return this.massageData(newfstr, this.massageData(fstr, data));
      }
    } else {
      const splits = filterString.split(/=+|>|<|INCLUDE/);

      if (splits && splits.length === 2) {
        if (filterString.indexOf('=') > -1) return data.filter(f => f[splits[0]] == splits[1]);
        if (filterString.indexOf('>') > -1) return data.filter(f => f[splits[0]] > splits[1]);
        if (filterString.indexOf('<') > -1) return data.filter(f => f[splits[0]] < splits[1]);
        if (filterString.indexOf('INCLUDE') > -1) return data.filter(f => f[splits[0]].indexOf(splits[1]) > -1);
      } else {
        return data;
      }
    }
  }

  filterClick(filterString) {
    // p/s: ._. dont try break my code...
    filterString = filterString.replace(/\s/g,'');
    this.data = this.massageData(filterString, this.cache);
  }

  ngOnInit() {
    if (this.service) {
      this.service.getByType(this.type).then(res => {
        this.data = res.slice(0);
        this.cache = res.slice(0);
        this.titles = this.getTitles(res);
        this.loading = false;
      });
    }
  }
}