import {charactersContinentType} from "../shared/types";
import {Paginator} from "array-paginator";

/**
 * pagination is handled here so the pagination logic can be centralized allowing to easily modify logic or use/switch 3rd party
 * pagination packages easily
 * @param dataset
 * @param page
 * @param size
 */
const paginate = (dataset: charactersContinentType, page: number, size:number = 5) : charactersContinentType => {

  const paginator = new Paginator(dataset, size);
  if (page) {
    return paginator.page(page)!;
  }
  return paginator.all;
}

export default paginate;