export type Item = {
  code: string
  name: string
  level: "province" | "city" | "area"
  country_code?: string
  province_code?: string
  city_code?: string
}
