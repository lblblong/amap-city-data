import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonAll(items: Item[]) {
  writeToJson(
    "all.json",
    items.map((it) => {
      const result = {
        name: it.name,
        code: it.code,
        level: it.level,
        center: it.center,
        parent_code: "",
      }

      if (it.level === "city") {
        result.parent_code = it.province_code!
      } else if (it.level === "area") {
        result.parent_code = it.city_code!
      }
      return result
    })
  )
}
