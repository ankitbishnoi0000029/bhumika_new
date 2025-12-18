"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Search,
  Menu,
  Link2,
  TrendingUp,
  Sparkles,
  Code,
  DollarSign,
  Home,
  Wrench,
  Shield,
  FileText,
  Layers,
  Braces,
  Database,
  Image,
  LucideIcon,
  FlameKindling,
} from "lucide-react";
import { getTableData } from "@/actions/dbAction";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface Tool {
  id: number;
  u_Id: string;
  name: string;
  url: string;
  des: string;
  keyword: string;
  category: string;
}

interface CategoryItem {
  id: string;
  name: string;
  icon: LucideIcon;
}

const categories: CategoryItem[] = [
  { id: "header", name: "Header", icon: FlameKindling },

  { id: "popular", name: "Popular Tools", icon: TrendingUp },
  { id: "trendingtools", name: "Trending Tools", icon: Sparkles },

  { id: "developertools", name: "Developer Tools", icon: Code },
  { id: "utility", name: "Utility Tools", icon: Wrench },

  { id: "encode_decode", name: "Encode / Decode", icon: Shield },
  { id: "base64_tools", name: "Base64 Tools", icon: Layers },

  { id: "html_converters", name: "HTML Converters", icon: FileText },
  { id: "json_converters", name: "JSON Converters", icon: Braces },
  { id: "xml_converters", name: "XML Converters", icon: FileText },
  { id: "yaml_converters", name: "YAML Converters", icon: FileText },

  { id: "sql_converters", name: "SQL Converters", icon: Database },
  // { id: "sql_url", name: "SQL URL Tools", icon: Link2 },

  { id: "image_tools", name: "Image Tools", icon: Image },

  { id: "urltometa", name: "URL to Meta", icon: Link2 },

  { id: "categories", name: "Categories", icon: Menu },
  { id: "subcategories", name: "Sub Categories", icon: Menu },

  { id: "navbar", name: "Navbar", icon: Menu },
  { id: "sunnavbar", name: "Sub Navbar", icon: Menu },

  { id: "nf", name: "New Features", icon: Sparkles },
];

export default function AdminPanel() {
  /* ===================== THEME ===================== */
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  /* ===================== STATE ===================== */
  const [tools, setTools] = useState<Tool[]>([]);

  const [activeCategory, setActiveCategory] = useState("Header");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTool, setEditingTool] = useState<Tool | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState<Omit<Tool, "id">>({
    u_Id: "",
    name: "",
    url: "",
    des: "",
    keyword: "",
    category: "developerTools",
  });

  /* ===================== HELPERS ===================== */
  const openModal = (tool?: Tool) => {
    if (tool) {
      setEditingTool(tool);
      setFormData({ ...tool });
    } else {
      setEditingTool(null);
      setFormData({
        u_Id: "",
        name: "",
        url: "",
        des: "",
        keyword: "",
        category: activeCategory === "all" ? "developerTools" : activeCategory,
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTool(null);
  };

  const handleSubmit = () => {
    if (!Object.values(formData).every(Boolean)) {
      alert("Please fill all fields");
      return;
    }

    if (editingTool) {
      setTools((prev) =>
        prev.map((t) =>
          t.id === editingTool.id ? { ...formData, id: editingTool.id } : t
        )
      );
    } else {
      setTools((prev) => [...prev, { ...formData, id: Date.now() }]);
    }

    closeModal();
  };

  const handleDelete = (id: number) => {
    if (confirm("Delete this tool?")) {
      setTools((prev) => prev.filter((t) => t.id !== id));
    }
  };

  const filteredTools = tools.filter(
    (t) =>
      (activeCategory === "all" || t.category === activeCategory) &&
      (t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.u_Id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.des.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getDetails = async (id: string) => {
    setActiveCategory(id);
    // alert(id)
    const data: any[] = await getTableData(id);
    // Map database result to Tool[]
    const mappedTools: Tool[] = data.map((item: any) => ({
      id: item.id,
      u_Id: item.urlName,
      name: item.name || "",
      url: item.route,
      des: item.des,
      keyword: item.keyword,
      metaData : item.metadata,
      category: id === "all" ? "developerTools" : id,
    }));
    setTools(mappedTools);
    console.log(mappedTools);
  };


const handleEdit =(tooldata)=>{
      openModal();
      console.log(tooldata)
}

  const getCategoryName = (id: string) =>
    categories.find((c) => c.id === id)?.name || id;

  /* ===================== UI ===================== */
  return (
    <div
      className="min-h-screen bg-slate-50 dark:bg-black text-gray-900 dark:text-gray-100"
      suppressHydrationWarning={true}
    >
      {/* ===================== SIDEBAR ===================== */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-black border-r dark:border-slate-800 transform transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 border-b dark:border-slate-800 bg-gradient-to-r from-blue-600 to-indigo-600">
          <h2 className="text-xl font-bold text-white">Admin Panel</h2>
          <p className="text-blue-100 text-sm">Tool Manager</p>
        </div>

        <nav className="p-4 p-y-2 space-y-1">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                // onClick={() => setActiveCategory(cat.id)}
                onClick={() => getDetails(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition hover:cursor-pointer
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
              >
                <Icon size={18} />
                {cat.name}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* ===================== MAIN ===================== */}
      <div className="lg:ml-64">
        {/* HEADER */}
        <div className="sticky top-0 z-30 bg-white dark:bg-black border-b dark:border-slate-800 px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden"
            >
              <Menu />
            </button>
            <h1 className="text-2xl font-bold">
              {getCategoryName(activeCategory)}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-slate-800"
            >
              {theme === "light" ? "🌙" : "☀️"}
            </button>
            <button
              onClick={() => openModal()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Plus size={18} /> Add Tool
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="p-6">
          <input
            placeholder="Search tools..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full mb-6 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border dark:border-slate-700"
          />

          <div className="space-y-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl p-4 flex justify-between"
              >
                <div>
                  <h3 className="font-bold">{tool.name}</h3>
                  <p className="text-sm opacity-80">{tool.des}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(tool)}>
                    <Edit2 size={12} />
                  </button>
                  <button onClick={() => handleDelete(tool.id)}>
                    <Trash2 size={14} className="text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===================== MODAL ===================== */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-xl rounded-2xl">
          <DialogHeader className="p-0">
            <DialogTitle className="text-lg font-semibold">
              {editingTool ? "Edit Tool" : "Add New Tool"}
            </DialogTitle>
          </DialogHeader>

          {/* table name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-muted-foreground">
              Table Name
            </label>

            {/* <Select onValueChange={(value) => setTableName(value)}> */}
            <Select>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select table name" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    <div className="flex items-center gap-2">
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                      <span>{item.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {/* URL ID */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                URL ID
              </label>
              <Input placeholder="example-tool" />
            </div>

            {/* Tool Name */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Tool Name
              </label>
              <Input placeholder="SQL to CSV Converter" />
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Tool Description
              </label>
              <Textarea
                rows={3}
                placeholder="Short description about this tool"
              />
            </div>

            {/* keyword  */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Keyword
              </label>
              <Input placeholder="sql to csv, sql converter, csv generator" />
            </div>

            {/* Route */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-muted-foreground">
                Route Path
              </label>
              <Input placeholder="/sql-converters/sql-to-csv" />
            </div>

            {/* SEO Section */}
            <div className="border-t border-dashed border-black">
              <h3 className="text-sm font-semibold mb-2">SEO Metadata</h3>

              {/* Meta Title */}
              <div className="space-y-1 mb-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Meta Title
                </label>
                <Input placeholder="SQL to CSV Converter Online Free Tool" />
                <p className="text-xs text-muted-foreground">
                  Recommended: 50–60 characters
                </p>
              </div>

              {/* Meta Description */}
              <div className="space-y-1 mb-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Meta Description
                </label>
                <Textarea
                  rows={3}
                  placeholder="Convert SQL queries into CSV format instantly with our free online tool."
                />
                <p className="text-xs text-muted-foreground">
                  Recommended: 150–160 characters
                </p>
              </div>

              {/* Meta Keywords */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-muted-foreground">
                  Meta Keywords
                </label>
                <Input placeholder="sql to csv, sql converter, csv generator" />
              </div>
            </div>
          </div>

          <DialogFooter className="gap-2 pt-2">
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Save Tool</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
