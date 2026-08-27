const fs = require("fs");
let content = fs.readFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\page.tsx", "utf8");

// Fix: Replace Math.random() in JSX with pre-computed heights
content = content.replace(
  "{work.id}",
  "{work.id} data-h=\"{work.height}\""
);

// Add height to each work object
content = content.replace(
  "{ id: 'PM-000001', title: '海上菲比'",
  "{ id: 'PM-000001', height: 240, title: '海上菲比'"
);
content = content.replace(
  "{ id: 'PM-000002', title: '荒原航线'",
  "{ id: 'PM-000002', height: 280, title: '荒原航线'"
);
content = content.replace(
  "{ id: 'PM-000003', title: '深海来信'",
  "{ id: 'PM-000003', height: 220, title: '深海来信'"
);
content = content.replace(
  "{ id: 'PM-000004', title: '霓虹之下'",
  "{ id: 'PM-000004', height: 300, title: '霓虹之下'"
);
content = content.replace(
  "{ id: 'PM-000005', title: '校园午后'",
  "{ id: 'PM-000005', height: 260, title: '校园午后'"
);
content = content.replace(
  "{ id: 'PM-000006', title: '未知档案'",
  "{ id: 'PM-000006', height: 320, title: '未知档案'"
);
content = content.replace(
  "{ id: 'PM-000007', title: '沙漠旅人'",
  "{ id: 'PM-000007', height: 250, title: '沙漠旅人'"
);
content = content.replace(
  "{ id: 'PM-000008', title: '月夜狐'",
  "{ id: 'PM-000008', height: 290, title: '月夜狐'"
);
content = content.replace(
  "{ id: 'PM-000009', title: '樱花季'",
  "{ id: 'PM-000009', height: 230, title: '樱花季'"
);
content = content.replace(
  "{ id: 'PM-000010', title: '机械之心'",
  "{ id: 'PM-000010', height: 270, title: '机械之心'"
);
content = content.replace(
  "{ id: 'PM-000011', title: '水墨丹青'",
  "{ id: 'PM-000011', height: 310, title: '水墨丹青'"
);
content = content.replace(
  "{ id: 'PM-000012', title: '像素世界'",
  "{ id: 'PM-000012', height: 240, title: '像素世界'"
);

// Replace Math.random() with work.height
content = content.replace(
  "{ height: 200 + Math.floor(Math.random() * 150), background: work.gradient }",
  "{ height: work.height, background: work.gradient }"
);

// Remove the data-h attribute we added temporarily
content = content.replace(' data-h="{work.height}"', '');

fs.writeFileSync("D:\\dev\\Phoebe\\phoebe-museum\\src\\app\\page.tsx", content, "utf8");
console.log("Fixed hydration error");