import { Component, OnInit } from '@angular/core';

class AudioFile {
  url: String;
  loop: Boolean;

  constructor({ url, loop }) {
    this.url = url;
    this.loop = loop || false;
  }
}

@Component({
  selector: 'myaudio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit  {
  audios: Array<AudioFile> = [];
  addString: String = '';

  constructor() {
    this.audios = [
      'https://static.bandlab.com/soundbanks/previews/new-wave-kit.ogg',
      'https://static.bandlab.com/soundbanks/previews/synth-organ.ogg'
    ].map(url => new AudioFile({ url, loop: true }));
  }

  add() {
    if (this.addString) {
      this.audios.push(new AudioFile({ url: this.addString, loop: true }));
      this.addString = '';
    }
  }

  ngOnInit() {
    console.log('Audio Page');
  }
}