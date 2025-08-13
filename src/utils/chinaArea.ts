import REGION_DATA from "china-area-data";
import { cloneDeep } from "@pureadmin/utils";

interface ProvinceData {
  value: string;
  label: string;
  children?: Array<ProvinceData>;
}

// Map of codes to English text, e.g., CodeToText['110000'] outputs 'Beijing'
const CodeToText = {};
// Map of English text to codes, e.g., TextToCode['Beijing']['City District']['Chaoyang District'].code outputs '110105'
const TextToCode = {};
// Province data object
const provinceObject = REGION_DATA["86"];
// Three-level region data (province, city, district) without "All" option
const regionData = [];
// Two-level region data (province, city) without "All" option
let provinceAndCityData = [];

const ALL_TEXT = "All";

CodeToText[""] = ALL_TEXT;

// Process provinces
Object.keys(provinceObject).forEach(prop => {
  const provinceText = provinceObject[prop];
  regionData.push({
    value: prop, // Province code
    label: provinceText // Province name in English
  });
  CodeToText[prop] = provinceText;
  TextToCode[provinceText] = {
    code: prop
  };
  TextToCode[provinceText][ALL_TEXT] = {
    code: ""
  };
});

// Process cities
regionData.forEach((item: ProvinceData) => {
  const provinceCode = item.value;
  const provinceText = item.label;
  const provinceChildren = [];
  const provinceData = REGION_DATA[provinceCode] ?? {};

  Object.keys(provinceData).forEach(prop => {
    provinceChildren.push({
      value: prop,
      label: provinceData[prop]
    });
    CodeToText[prop] = provinceData[prop];
    TextToCode[provinceText][provinceData[prop]] = {
      code: prop
    };
    TextToCode[provinceText][provinceData[prop]][ALL_TEXT] = {
      code: ""
    };
  });

  if (provinceChildren.length) {
    item.children = provinceChildren;
  }
});
provinceAndCityData = cloneDeep(regionData);

// Process districts
regionData.forEach((item: ProvinceData) => {
  const province = item.children;
  const provinceText = item.label;

  if (province) {
    province.forEach(pItem => {
      const cityCode = pItem.value;
      const cityText = pItem.label;
      const cityChildren = [];
      const cityData = REGION_DATA[cityCode] ?? {};

      Object.keys(cityData).forEach(prop => {
        cityChildren.push({
          value: prop,
          label: cityData[prop]
        });
        CodeToText[prop] = cityData[prop];
        TextToCode[provinceText][cityText][cityData[prop]] = {
          code: prop
        };
      });

      if (cityChildren.length) {
        pItem.children = cityChildren;
      }
    });
  }
});

// Add "All" option
const provinceAndCityDataPlus = cloneDeep(provinceAndCityData);
provinceAndCityDataPlus.unshift({
  value: "",
  label: ALL_TEXT
});
provinceAndCityDataPlus.forEach((item: ProvinceData) => {
  const province = item.children;

  if (province?.length) {
    province.unshift({
      value: "",
      label: ALL_TEXT
    });

    province.forEach(pItem => {
      const city = pItem.children;

      if (city?.length) {
        city.unshift({
          value: "",
          label: ALL_TEXT
        });
      }
    });
  }
});

const regionDataPlus = cloneDeep(regionData);
regionDataPlus.unshift({
  value: "",
  label: ALL_TEXT
});
regionDataPlus.forEach((item: ProvinceData) => {
  const province = item.children;

  if (province?.length) {
    province.unshift({
      value: "",
      label: ALL_TEXT
    });
    province.forEach(pItem => {
      const city = pItem.children;

      if (city?.length) {
        city.unshift({
          value: "",
          label: ALL_TEXT
        });
      }
    });
  }
});

/**
 * Convert Chinese text to region codes
 * @param provinceText Province name
 * @param cityText City name
 * @param regionText District name
 * @returns Formatted region code string
 */
function convertTextToCode(
  provinceText: string,
  cityText: string,
  regionText?: string
): string {
  let code = "";
  if (provinceText && TextToCode[provinceText]) {
    const province = TextToCode[provinceText];
    code = province.code;

    if (cityText && province[cityText]) {
      const city = province[cityText];
      code = `${code}${cityText === ALL_TEXT ? "" : ", "}${city.code}`;

      if (regionText && city[regionText]) {
        code = `${code}${regionText === ALL_TEXT ? "" : ", "}${
          city[regionText].code
        }`;
      }
    }
  }
  return code;
}
export {
  provinceAndCityData,
  regionData,
  provinceAndCityDataPlus,
  regionDataPlus,
  CodeToText,
  TextToCode,
  convertTextToCode
};
