import { Observable } from 'rxjs';

export default interface ProductGrpcService {
  create(data: { name: string; price: number }): Observable<any>;
}
