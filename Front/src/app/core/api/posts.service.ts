import { Injectable, EventEmitter } from '@angular/core';
import { IpcService } from 'src/app/ipc.service';
import { IPostExt } from '../models/posts';
import { StateService } from '../state.service';
import {DomSanitizer} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  /* Save Posts */
  public addSimplePostEmitter = new EventEmitter;
  public addImageSimplePostEmitter = new EventEmitter;
  public updatePostImageEmitter = new EventEmitter;

  constructor(
    public ipcService: IpcService,
    public stateService: StateService,
    public sanitizer: DomSanitizer
  ) {
    /* Get Posts */
    this.ipcService.on('[posts][result][list][published]', (evt: Electron.IpcMessageEvent, result: IPostExt[]) => {
      this.stateService.data.publishedPostList = result;
      this.stateService.emitChange('publishedPostList');
    });

    this.ipcService.on('[posts][result][list][unpublished]', (evt: Electron.IpcMessageEvent, result: IPostExt[]) => {
      this.stateService.data.unpublishedPostList = result;
      this.stateService.emitChange('unpublishedPostList');
    });

    this.ipcService.on('[posts][result][byID]', (evt: Electron.IpcMessageEvent, result: IPostExt) => {
      this.stateService.data.detailPost = result[0];
      this.stateService.emitChange('detailPost');
      // this.detailPostEmiter.emit(result[0]);
    });

    this.ipcService.on('[downloads][result][fromPost]', (evt: Electron.IpcMessageEvent, result: IPostExt) => {
      this.stateService.data.filesPost = result;
      this.stateService.emitChange('detailPost');
      // this.detailPostEmiter.emit(result[0]);
    });

    this.ipcService.on('[videos][result][fromPost]', (evt: Electron.IpcMessageEvent, result: IPostExt) => {
      this.stateService.data.videosPost = result;
      this.stateService.emitChange('detailPost');
      // this.detailPostEmiter.emit(result[0]);
    });

    this.ipcService.on('[videos][result][add]', (evt: Electron.IpcMessageEvent, result: IPostExt) => {
      this.stateService.data.videosPost = result;
      //this.stateService.data.videosPostIframe = result.map((item: any) => this.satinizeIframe(item.identificator));
      this.stateService.emitChange('detailPost');
      // this.detailPostEmiter.emit(result[0]);
    });


    /* Save Posts */
    this.ipcService.on('addSimplePostResultSent', (evt: Electron.IpcMessageEvent, result) => {
      this.addSimplePostEmitter.emit(result);
    });
    this.ipcService.on('addImageSimplePostResultSent', (evt: Electron.IpcMessageEvent, result) => {
      this.addImageSimplePostEmitter.emit(result);
    });
    this.ipcService.on('updatePostImageResultSent', (evt: Electron.IpcMessageEvent, result) => {
      this.updatePostImageEmitter.emit(result);
    });
  }

  public send(channel: string, ...args): void {
    this.ipcService.send(channel, ...args);
  }

  satinizeIframe(key) {
    return this.sanitizer.bypassSecurityTrustHtml('<iframe width="560" height="315" src="https://www.youtube.com/embed/'+key+'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen> </iframe>');
  }

}
