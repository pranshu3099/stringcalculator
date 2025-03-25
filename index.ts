export function greet() {
  return "hello";
}
type DelimiterData = {
  str: string;
  delimiter: RegExp;
};

function extractDelimiter(str: string): DelimiterData {
  let delimiter: RegExp = new RegExp(/[,\n]/);
  let filteredString: string = str;
  if (str.startsWith("//")) {
    /**
     * //;\n would place delimiter at index 2
     */
    const validDelimIndex = 2;
    let delim = str[validDelimIndex];

    let nextChar = "";
    let idx = validDelimIndex;

    while (nextChar !== "\n") {
      delim += nextChar;
      idx++;
      nextChar = str[idx];
      if (idx > str.length) break;
    }

    const newline = str[idx];
    if (!delim || newline !== "\n") {
      throw Error("invalid input");
    }
    filteredString = str.slice(idx + 1);
    delimiter = new RegExp(`${delim}|\n`);
  }
  return { delimiter, str: filteredString };
}

export function Add(input: string) {
  let sum = 0;
  if (input === "") return sum;
  if (!input) throw new Error("invalid input");
  const negativeList: number[] = [];
  let { delimiter, str } = extractDelimiter(input);
  str.split(delimiter).forEach((num) => {
    const number = Number(num);
    // checks for !num because "" coerces to zero causing isNaN(number) to be false
    // safegaurds against invalid condition with contigous delimiters. For eg. "1,\n"
    if (isNaN(number) || !num) {
      throw Error("invalid input");
    } else {
      if (number < 0) negativeList.push(number);
      sum += number;
    }
  });
  if (negativeList.length) {
    const negativeNumbers = negativeList.join(",");
    throw new Error(`negatives not allowed - ${negativeNumbers}`);
  }
  return sum;
}
