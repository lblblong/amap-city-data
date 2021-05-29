import { Item } from "../type"
import { writeToJson } from "../util"

export function jsonProvince(items: Item[]) {
  writeToJson(
    "province.json",
    items
      .filter((it) => it.level === "province")
      .map((it) => {
        return {
          name: it.name,
          code: it.code,
        }
      })
  )
}
