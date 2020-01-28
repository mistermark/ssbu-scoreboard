import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imagePath',
  pure: true
})
export class ImagePathPipe implements PipeTransform {
  imageFileStorePath = '/assets/images';

  transform(imageFileName: string, imageType: string): string {
    return `${this.imageFileStorePath}/${imageType}/${imageFileName}`;
  }
}
