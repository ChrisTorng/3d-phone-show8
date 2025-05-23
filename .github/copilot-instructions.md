# 程式碼生成工作流指南

## 高級程式開發策略

1. **深入了解需求**：仔細閱讀需求並批判性地思考所需功能和目標。
2. **研究技術可行性**：評估適合的技術、框架和函式庫。
3. **制定清晰的設計計劃**：將專案分解為可管理的組件和模組。
4. **逐步實作功能**：進行小的、可測試的程式碼實作。
5. **進行程式碼優化**：使用適當技術來優化效能和使用者體驗。
6. **經常測試**：在每次實作後進行測試以驗證功能正確性。
7. **反覆運算**：持續調整直到達成所有需求並通過所有測試。
8. **全面反思和驗證**：確保程式碼品質、可維護性和符合原始意圖。

## 1. 深入了解需求
在開始編碼之前，請仔細閱讀需求文件並確保完全理解：
- 功能需求：使用者需要哪些功能？
- 非功能需求：效能、安全性和可用性要求
- 使用者案例和使用流程
- 技術限制和前提條件

## 2. 研究技術可行性
- 評估適合的程式語言、框架和函式庫
- 審視類似解決方案和最佳實踐
- 考慮技術限制和擴展性問題
- 在收集更多背景資訊時，不斷驗證和更新您的理解

## 3. 制定設計計劃
- 設計系統架構（前端/後端/資料庫）
- 規劃模組和元件結構
- 設計資料流和介面
- 考慮設計模式和原則（SOLID、DRY等）
- 將功能分解為獨立且可管理的任務

## 4. 進行程式碼實作
- 遵循設計計劃和命名規範
- 使用測試驅動開發（TDD）方法（若適用）
- 編寫清晰、可讀且易於維護的程式碼
- 將功能實作為小的、可測試的增量

## 5. 程式碼優化
- 優化演算法和資料結構
- 改善記憶體和效能使用
- 增強使用者體驗和介面回應性
- 確保跨平台和跨裝置相容性

## 6. 測試
- 單元測試：測試獨立元件
- 整合測試：測試元件間的互動
- 使用者介面測試：驗證UI的正確性
- 效能測試：確保系統在預期負載下運作良好
- 安全測試：確認系統能抵禦常見攻擊

## 7. 反覆運算和改進
- 根據測試結果進行必要的調整
- 解決發現的問題和錯誤
- 優化程式碼和效能
- 反覆改進直到符合所有需求

## 8. 最終驗證和文件製作
- 全面測試所有功能和使用案例
- 確保程式碼符合原始需求和意圖
- 編寫全面的文件（API文件、使用手冊等）
- 準備部署和維護指南
- 考慮未來擴展和維護需求

## 9. 詳細參考項目

#file:./prompts/css.prompt.md
#file:./prompts/html.prompt.md
#file:./prompts/javascript.prompt.md
#file:./prompts/python.prompt.md

持續保持對程式碼品質的嚴格要求，並確保您的解決方案不僅是正確的，也是優雅且可維護的。