# 高德地图城市数据

从高德地图获取的省市区城市数据，方便插入数据库，用作级联城市选择组件数据源。

| 描述                            | 链接                                                                                               | 码云链接                                                                               |
| ------------------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 字母索引城市 - 级联数据（JSON） | [letter_city.json](https://github.com/lblblong/amap-city-data/blob/dist/letter_city.json?raw=true) | [letter_city.json](https://gitee.com/lblblib/amap-city-data/raw/dist/letter_city.json) |
| 省市区 - 扁平数据（JSON）       | [pca_flat.json](https://github.com/lblblong/amap-city-data/blob/dist/pca_flat.json?raw=true)       | [pca_flat.json](https://gitee.com/lblblib/amap-city-data/raw/dist/pca_flat.json)       |
| 省市区 - 级联数据（JSON）       | [pca_cascode.json](https://github.com/lblblong/amap-city-data/blob/dist/pca_cascode.json?raw=true) | [pca_cascode.json](https://gitee.com/lblblib/amap-city-data/raw/dist/pca_cascode.json) |
| 省市 - 扁平数据（JSON）         | [pc_flat.json](https://github.com/lblblong/amap-city-data/blob/dist/pc_flat.json?raw=true)         | [pc_flat.json](https://gitee.com/lblblib/amap-city-data/raw/dist/pc_flat.json)         |
| 省市 - 级联数据（JSON）         | [pc_cascode.json](https://github.com/lblblong/amap-city-data/blob/dist/pc_cascode.json?raw=true)   | [pc_cascode.json](https://gitee.com/lblblib/amap-city-data/raw/dist/pc_cascode.json)   |
| 省级数据（JSON）                | [province.json](https://github.com/lblblong/amap-city-data/blob/dist/province.json?raw=true)       | [province.json](https://gitee.com/lblblib/amap-city-data/raw/dist/province.json)       |
| 市级数据（JSON）                | [city.json](https://github.com/lblblong/amap-city-data/blob/dist/city.json?raw=true)               | [city.json](https://gitee.com/lblblib/amap-city-data/raw/dist/city.json)               |
| 区级数据（JSON）                | [area.json](https://github.com/lblblong/amap-city-data/blob/dist/area.json?raw=true)               | [area.json](https://gitee.com/lblblib/amap-city-data/raw/dist/area.json)               |

## 字母索引城市数据示例

`letter_city.json`

```json
[
  {
    "letter": "A",
    "citys": [
      { "code": "410500", "name": "安阳" },
      { "code": "340800", "name": "安庆" },
      ...
    ]
  },
  {
    "letter": "B",
    "citys": [
      { "code": "110100", "name": "北京" },
      { "code": "450500", "name": "北海" },
      ...
    ]
  },
  ...
]
```



## 省市区数据示例

扁平数据 `pca_flat.json`

```json
[
  {
    "name": "广东省",
    "code": "440000",
    "level": "province",
    "parent_code": ""
  },
  {
    "name": "汕头市",
    "code": "440500",
    "level": "city",
    "parent_code": "440000"
  },
  {
    "name": "潮阳区",
    "code": "440513",
    "level": "area",
    "parent_code": "440500"
  },
  {
    "name": "澄海区",
    "code": "440515",
    "level": "area",
    "parent_code": "440500"
  },
  ...
]
```

级联数据 `pca_cascode.json`

```json
[
  {
    "code": "440000",
    "name": "广东省",
    "children": [...]
  },
  {
    "code": "210000",
    "name": "辽宁省",
    "children": [
      {
        "code": "211400",
        "name": "葫芦岛市",
        "children": [
          { "code": "211422", "name": "建昌县" },
          { "code": "211481", "name": "兴城市" },
          ...
        ]
      }
    ]
  }
  ...
]
```



## 省级数据示例

`province.json`

```json
[
  { "name": "广东省", "code": "440000" },
  { "name": "辽宁省", "code": "210000" },
  { "name": "福建省", "code": "350000" },
  { "name": "湖南省", "code": "430000" },
  ...
]
```



## 市级数据示例

`city.json`

```json
[
  { "name": "汕头市", "code": "440500", "province_code": "440000" },
  { "name": "佛山市", "code": "440600", "province_code": "440000" },
  ...
]
```



## 区级数据示例

`area.json`

```json
[
  {
    "name": "潮阳区",
    "code": "440513",
    "city_code": "440500",
    "province_code": "440000"
  },
  {
    "name": "澄海区",
    "code": "440515",
    "city_code": "440500",
    "province_code": "440000"
  },
  ...
]
```

