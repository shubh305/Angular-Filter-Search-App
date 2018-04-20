import { Pipe, PipeTransform } from '@angular/core';
import { List } from './item';

@Pipe({
  name: 'itemfilter',
  pure: false
})
export class ItemFilterPipe implements PipeTransform {
  transform(items: List[], filter: List): List[] {
    if (!items || !filter) {
      return items;
    }
    // filter items array, items which match and return true will be kept, false will be filtered out
    return items.filter((item: List) => this.applyFilter(item, filter));
  }

  /**
   * Perform the filtering.
   *
   * @param {item} the item compare to the filter.
   * @param {filter} The filter to apply.
   * @return {boolean} True if item satisfies filters, false if not.
   */
  applyFilter(item: List, filter: List): boolean {
    for (let field in filter) {
      if (filter[field]) {
        if (typeof filter[field] === 'string') {
          if (item[field].toLowerCase().indexOf(filter[field].toLowerCase()) === -1) {
            return false;
          }
        }
      }
    }
    return true;
  }
}
