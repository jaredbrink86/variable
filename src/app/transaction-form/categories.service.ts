import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "./category.model";
import { map } from "rxjs/operators";

@Injectable({ providedIn: "root" })
export class CategoriesService {
  constructor(private http: HttpClient) {}

  fetchCategories() {
    return this.http
      .get<{ [key: string]: Category }>("http://localhost:4000/categories")
      .pipe(
        map((responseData) => {
          const categoriesArray = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              categoriesArray.push({ ...responseData[key] });
            }
          }
          return categoriesArray;
        })
      );
  }
}
