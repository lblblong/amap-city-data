import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonPcFlat(items: Item[]) {
  writeToJson(
    "pc_flat.json",
    items
      .filter((it) => it.level !== "area")
      .map((it) => {
        const result = {
          name: it.name,
          code: it.code,
          level: it.level,
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
