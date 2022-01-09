const YAML = require("yaml");
import { exportFile } from "fs-browsers";

export const saveYamlFile = (jsonObject) => {
  const doc = new YAML.Document();
  doc.contents = jsonObject;
  exportFile(doc.toString(), { fileName: "character.yaml" });
};
