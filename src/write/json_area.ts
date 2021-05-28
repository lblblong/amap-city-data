import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonArea(items: Item[]) {
  writeToJson(
    "area.json",
    items
      .filter((it) => it.level === 'area')
      .map((it) => {
        return {
          name: it.name,
          code: it.code,
          center: it.center,
          city_code: it.city_code,
          province_code: it.province_code,
        }
      })
  )
}
