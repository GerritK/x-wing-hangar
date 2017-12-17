import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'icons'
})
export class IconsPipe implements PipeTransform {
  transform(value: string): any {
    const regex = new RegExp('<i-([^>]+)>', 'g');
    return value.replace(regex, (val, icon) => {
      return '<i class="xwing-miniatures-font xwing-miniatures-font-' + icon + '"></i>';
    });
  }
}
