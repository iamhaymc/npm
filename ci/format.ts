import * as Fs from "fs";
import * as Path from "path";
import { default as glob } from "fast-glob";
import * as prettier from "prettier";
import { format as formatCoffee } from "coffee-fmt";
import { SassFormatter } from "sass-formatter";

(async () => {
  for (let path of await glob(["**/*"], { dot: true })) {
    const prettierOptions = {
      parser: <any>null,
      plugins: ["@prettier/plugin-xml", "@prettier/plugin-pug"],
    };
    const info = await prettier.getFileInfo(path, {
      ignorePath: ".prettierignore",
      plugins: prettierOptions.plugins,
    });
    if (!info.ignored) {
      let extension = Path.extname(path)?.toLowerCase();
      switch (extension) {
        case ".jo":
          prettierOptions.parser = "jo";
          break;
        case ".sass":
          prettierOptions.parser = "sass";
          break;
        default:
          prettierOptions.parser =
            prettierOptions.parser ?? info.inferredParser;
          break;
      }
      if (prettierOptions.parser) {
        if (prettierOptions.parser === "jo") {
          // Format with CoffeeScript formatter
          console.log(`Formatting (${prettierOptions.parser}): ${path}`);
          let code = Fs.readFileSync(path, "utf-8");
          let fcode = formatCoffee(code, {
            tab: "  ",
            newLine: "\n",
            debug: false,
          })?.toString();
          if (fcode) Fs.writeFileSync(path, fcode, "utf-8");
          else console.error("Failure to format: " + path);
        } else if (prettierOptions.parser === "sass") {
          // Format with Sass formatter
          console.log(`Formatting (${prettierOptions.parser}): ${path}`);
          let code = Fs.readFileSync(path, "utf-8");
          let fcode = SassFormatter.Format(code, {
            tabSize: 2,
            insertSpaces: true,
            lineEnding: "LF",
            deleteEmptyRows: true,
            setPropertySpace: true,
            debug: false,
          });
          if (fcode) Fs.writeFileSync(path, fcode, "utf-8");
          else console.error("Failure to format: " + path);
        } else {
          // Format with Prettier formatter
          let code = Fs.readFileSync(path, "utf-8");
          if (!(await prettier.check(code, prettierOptions))) {
            console.log(`Formatting (${prettierOptions.parser}): ${path}`);
            let fcode = await prettier.format(code, prettierOptions);
            if (fcode) Fs.writeFileSync(path, fcode, "utf-8");
            else console.error("Failure to format: " + path);
          }
        }
      }
    }
  }
})();
