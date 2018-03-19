import { Injectable } from '@angular/core';
import { Promotion } from '../shared/promotion';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BaseURL } from '../shared/baseurl';
import { ProcessHTTPMsgService } from './process-httpmsg.service';
import { RestangularModule, Restangular } from 'ngx-restangular';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';

//import { PROMOTIONS } from '../shared/promotions';

@Injectable()
export class PromotionService {

   constructor(private restangular: Restangular,
              private processHTTPMsgService: ProcessHTTPMsgService) { }

 getPromotions(): Observable<Promotion[]> {
    return this.restangular.all('promotions').getList();
  }

  getPromotion(id: number): Observable<Promotion> {
    return  this.restangular.one('promotions',id).get();
  }

  getFeaturedPromotion(): Observable<Promotion> {
    return this.restangular.all('promotions').getList({featured: true})
      .map(promotions => promotions[0]);
  }

  getPromotionIds(): Observable<number[] | any> {
    return this.getPromotions()
      .map(promotions => { return promotions.map(promotion => promotion.id) })
      .catch(error => { return error; } );
  }
}
