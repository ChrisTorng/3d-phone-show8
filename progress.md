1. Agent: 請為我生成 3D 手機模型顯示網站。
2. Agent: 請為我依 models 裡的三個 glb 模型，置換目前的假手機模型，並提供三個選項可以選擇手機。
3. Ask: 目前的模型有大有小，請問我要如何變更它們預設載入時顯示的大小? 目前我想把第三個模型加大三倍。
4. Inline Chat: 我想要模型下移一倍空間長度
5. Inline Chat: 我要向左旋轉 90 度
6. Agent: 請上網搜尋目前三支手機的詳細規格，填入畫面右側手機名稱之下。
7. Agent: 請直接找到 html/js 中適當位置，將這些資訊都加入，注意要使用 JSON 格式填入資料。
8. Agent: 請將所有 html/js 裡寫死資料移到獨立的 JSON 資料檔。
9. Agent: 請使用 Python Flask 建立網站，可以服務目前的網頁及相關資源檔，還有 JSON 檔下載。
10. Ask: @mermAId /sequence

```cmd
python index.py
uv pip freeze > requirements.txt
```
