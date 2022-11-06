/**
 * expected filters from query string
 */
import exp from "constants";

export const ALLOWED_FILTERS = ['title', 'family'];

export const CONTINENT_SELECTION_RULES = {
  CONTINENT_ID_IF_DIVISIBLE_BY_3_AND_5 : 3,
  CONTINENT_ID_IF_DIVISIBLE_BY_3_OR_5 : 2,
  CONTINENT_ID_IF_EVEN : 1,
  CONTINENT_ID_IF_ODD : 0
}

export const HTTP_CODES = {
  SUCCESS: 200,
  CREATED: 201,
  SERVER_ERROR: 500
}