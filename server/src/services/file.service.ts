import { UploadedFile } from "express-fileupload";
import { v4 as uuid } from "uuid";
import fs from "fs";
import path from "path";

class FileService {
  save(file: UploadedFile) {
    try {
      const fileName = uuid() + ".jpg";
      const currentDir = __dirname;
      const staticDir = path.join(currentDir, "..", "static");
      const filePath = path.join(staticDir, fileName);

      if (!fs.existsSync(staticDir))
        fs.mkdirSync(staticDir, { recursive: false });

      file.mv(filePath);
      return fileName;
    } catch (error) {
      throw new Error(`Error saving file: ${error}`);
    }
  }
}

export default new FileService();
