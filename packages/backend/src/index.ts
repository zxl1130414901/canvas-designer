import express, { Request, Response } from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

// 中间件
app.use(cors());
app.use(express.json());

// 健康检查
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: '海报生成器后端服务运行中' });
});

// AI生成接口（预留）
app.post('/api/ai/generate', async (req: Request, res: Response) => {
  try {
    const { type, prompt, style, constraints } = req.body;

    // TODO: 集成通义千问API
    console.log('AI生成请求:', { type, prompt, style, constraints });

    // 临时返回模拟数据
    res.json({
      success: true,
      data: {
        type,
        prompt,
        style,
        message: 'AI功能开发中，请稍后使用',
      },
    });
  } catch (error) {
    console.error('AI生成错误:', error);
    res.status(500).json({
      success: false,
      error: 'AI生成失败',
    });
  }
});

// 导出SVG接口
app.post('/api/export/svg', (req: Request, res: Response) => {
  try {
    const { canvas } = req.body;

    // TODO: 实现SVG导出逻辑
    console.log('导出SVG请求');

    res.json({
      success: true,
      data: {
        message: '导出功能开发中',
      },
    });
  } catch (error) {
    console.error('导出错误:', error);
    res.status(500).json({
      success: false,
      error: '导出失败',
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 后端服务运行在 http://localhost:${PORT}`);
  console.log(`📊 健康检查: http://localhost:${PORT}/health`);
});
