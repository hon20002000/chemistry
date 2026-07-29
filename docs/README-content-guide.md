# Chapter 07 內容文件說明

這些文件是對應老師易編輯版 `index.html` 使用的內容檔。

## Markdown 檔案

- `content/md-intro.md`：本章導言、學習目標、課堂提示
- `content/md-concept-notes.md`：概念重點與常見迷思
- `content/md-review.md`：延遲複習與回顧題
- `content/md-quick-questions.md`：短答題與快速提問

## HTML 嵌入檔

- `embeds/html-quiz-cards.html`：題目卡與答案展開區
- `embeds/html-misconception-check.html`：常見錯誤檢查題
- `embeds/html-rutherford-demo.html`：盧瑟福散射實驗動畫示例
- `embeds/html-ion-demo.html`：電子轉移示意

## 資產檔

- `assets/teacher-embeds.css`：題目卡與動畫樣式
- `assets/teacher-loader.js`：讀取 Markdown / HTML 內容並插入頁面

## 建議做法

- 改文字內容時，優先改 `.md` 檔。
- 加題目卡或動畫時，改 `embeds/` 裡對應的 `.html`。
- 若加入新區塊，請保持命名規則：`md-*` 或 `html-*`。
