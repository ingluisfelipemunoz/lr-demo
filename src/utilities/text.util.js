export default class TextUtil {
  static camelCaseToSpaces(text) {
    const result = text.replace(/([A-Z])/g, " $1").toLowerCase();
    return result.trim();
  }
}
