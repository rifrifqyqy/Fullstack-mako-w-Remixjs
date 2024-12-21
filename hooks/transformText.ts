/**
 * Mengubah setiap kata yang memiliki '-' menjadi spasi.
 * @param {string} text - Teks yang akan diubah.
 * @returns {string} - Teks yang sudah diubah.
 */
export function transformHyphenToSpace(text: string): string {
  return text.replace(/-/g, " ");
}
