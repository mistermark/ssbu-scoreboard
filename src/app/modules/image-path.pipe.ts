import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath',
  pure: true
})
export class ImagePathPipe implements PipeTransform {
  imageFileStorePath = '/assets/uploads';

  transform(imageFileName: string): string {
    return `${this.imageFileStorePath}/${imageFileName}`;
  }
}
