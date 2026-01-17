import React from 'react';
import { Palette, Save, Download } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="app-header">
      <div className="header-left">
        <div className="logo">
          <div className="logo-icon"><Palette size={24} /></div>
          <span className="logo-text">海报生成器</span>
        </div>
      </div>

      <div className="header-center">
        <div className="nav-tabs">
          <button className="nav-tab active">设计</button>
          <button className="nav-tab">模板</button>
          <button className="nav-tab">我的作品</button>
        </div>
      </div>

      <div className="header-right">
        <button className="header-btn">
          <Save size={16} />
          <span>保存</span>
        </button>
        <button className="header-btn primary">
          <Download size={16} />
          <span>导出</span>
        </button>
      </div>
    </header>
  );
};