import {CharactersContinents} from "../services";
import {ALLOWED_FILTERS, HTTP_CODES} from "../shared/constants";
import {Request, Response} from "express"
import {filtersType, paginationType} from "../shared/types";

/**
 * process request parameters
 * handle response
 * @param req
 * @param res
 */
const characterContinentApiHandler =  async (req: Request, res: Response) => {

  const filters:filtersType = {};

  ALLOWED_FILTERS.forEach((item: string) => {
    if(req.query[item]) {
      filters[item] = <string>req.query[item]
    }
  });

  const pagination: paginationType = {
    size : Number(req.query.size),
    page : Number(req.query.page)
  }

  try {
    const characterContinentsObj = new CharactersContinents();
    const data = await characterContinentsObj.getCharactersWithContinents(filters, pagination);
    res.statusCode = HTTP_CODES.SUCCESS;
    return res.send(data);
  } catch (e: any) {
    console.log(e);
    res.statusCode = HTTP_CODES.SERVER_ERROR;
    return res.send(e.message);
  }
}

export {
  characterContinentApiHandler
}