import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonCity(items: Item[]) {
  writeToJson(
    "city.json",
    items
      .filter((it) => it.level === "city")
      .map((it) => {
        return {
          name: it.name,
          code: it.code,
          province_code: it.province_code,
        }
      })
  )
}
