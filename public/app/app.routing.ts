import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post/post.component';
import { AudioComponent } from './audio/audio.component';

const routes: Routes = [
  { path: '', component: PostComponent },
  { path: 'audio', component: AudioComponent}
];

export const routing = RouterModule.forRoot(routes);