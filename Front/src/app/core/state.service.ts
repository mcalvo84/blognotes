import { Injectable, EventEmitter } from '@angular/core';
import { IPostExt } from './models/posts';

export interface IFeaturesState {
  display?: string;
  PostList?: IPostExt[];
  publishedPostList?: IPostExt[];
  unpublishedPostList?: IPostExt[];
  detailPost?: IPostExt;
  detailPostTags?: any[];
  detailPostNotes?: any[];
  filterMode?: boolean;
  allTags?: {tid: number, tname: string, ttid: 1, ttname: string}[];
  selectedTags?: number[];
  avaliableTags?: number[];
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

  public data: IFeaturesState;
  public changeEmitter = new EventEmitter;

  constructor() {
    this.data = {};

    // Layout
    this.data.display = 'home';
    this.data.filterMode = true;

    // Post lists
    this.data.PostList = [];
    this.data.publishedPostList = [];
    this.data.unpublishedPostList = [];

    // Post detail
    this.data.detailPost = null;
    this.data.detailPostTags = [];
    this.data.detailPostNotes = [];

    // Tags
    this.data.allTags = [];
    this.data.selectedTags = [];
    this.data.avaliableTags = [];
  }

  emitChange(stateItems) {
    console.log('emitChange()', stateItems);
    this.changeEmitter.emit(stateItems);
  }
}
