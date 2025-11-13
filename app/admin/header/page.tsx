'use client';

import { useState, useEffect } from 'react';
import { MenuItem } from '@/lib/storage';

export default function HeaderAdmin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/content');
      if (!response.ok) {
        throw new Error('Failed to fetch content');
      }
      const data = await response.json();
      setMenuItems(data.header || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      setMessage({ type: 'error', text: 'Failed to load menu items' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      const response = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          field: 'header',
          content: menuItems,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save menu items');
      }

      setMessage({ type: 'success', text: 'Header menu saved successfully!' });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      console.error('Error saving content:', error);
      setMessage({ type: 'error', text: 'Failed to save menu items' });
    } finally {
      setSaving(false);
    }
  };

  const addMenuItem = (item: Omit<MenuItem, 'id'>) => {
    const newItem: MenuItem = {
      ...item,
      id: Date.now().toString(),
    };
    setMenuItems([...menuItems, newItem]);
    setShowAddForm(false);
  };

  const updateMenuItem = (updatedItem: MenuItem) => {
    setMenuItems(menuItems.map(item => 
      item.id === updatedItem.id ? updatedItem : item
    ));
    setEditingItem(null);
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
  };

  const addSubItem = (parentId: string, subItem: Omit<MenuItem, 'id'>) => {
    const newSubItem: MenuItem = {
      ...subItem,
      id: `${parentId}-${Date.now()}`,
    };
    
    setMenuItems(menuItems.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          subItems: [...(item.subItems || []), newSubItem]
        };
      }
      return item;
    }));
  };

  const deleteSubItem = (parentId: string, subItemId: string) => {
    setMenuItems(menuItems.map(item => {
      if (item.id === parentId) {
        return {
          ...item,
          subItems: item.subItems?.filter(sub => sub.id !== subItemId) || []
        };
      }
      return item;
    }));
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading header editor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Header Menu Management</h1>
          <p className="text-gray-600">Manage navigation menus and dropdown items</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
          >
            ➕ Add Menu Item
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? '💾 Saving...' : '💾 Save Changes'}
          </button>
        </div>
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg mb-6 ${
          message.type === 'success' 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.text}
        </div>
      )}

      {/* Menu Items List */}
      <div className="bg-white rounded-lg shadow-md border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Current Menu Items</h2>
          <p className="text-gray-600 text-sm mt-1">Drag to reorder, click to edit</p>
        </div>
        
        <div className="p-6">
          {menuItems.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <span className="text-4xl mb-4 block">📋</span>
              <p>No menu items yet. Add your first menu item to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {menuItems.map((item, index) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  index={index}
                  onEdit={setEditingItem}
                  onDelete={deleteMenuItem}
                  onAddSubItem={addSubItem}
                  onDeleteSubItem={deleteSubItem}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Forms */}
      {showAddForm && (
        <MenuItemForm
          onSave={addMenuItem}
          onCancel={() => setShowAddForm(false)}
          title="Add New Menu Item"
        />
      )}

      {editingItem && (
        <MenuItemForm
          item={editingItem}
          onSave={updateMenuItem}
          onCancel={() => setEditingItem(null)}
          title="Edit Menu Item"
        />
      )}
    </div>
  );
}

// Menu Item Card Component
function MenuItemCard({ 
  item, 
  index, 
  onEdit, 
  onDelete, 
  onAddSubItem, 
  onDeleteSubItem 
}: {
  item: MenuItem;
  index: number;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
  onAddSubItem: (parentId: string, subItem: Omit<MenuItem, 'id'>) => void;
  onDeleteSubItem: (parentId: string, subItemId: string) => void;
}) {
  const [showSubForm, setShowSubForm] = useState(false);

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <span className="text-gray-400 font-mono text-sm">{index + 1}.</span>
          <div>
            <h3 className="font-semibold text-gray-900">{item.title}</h3>
            {item.url && (
              <p className="text-sm text-gray-500">{item.url}</p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSubForm(true)}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ➕ Sub Item
          </button>
          <button
            onClick={() => onEdit(item)}
            className="text-green-600 hover:text-green-800 text-sm"
          >
            ✏️ Edit
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            🗑️ Delete
          </button>
        </div>
      </div>

      {/* Sub Items */}
      {item.subItems && item.subItems.length > 0 && (
        <div className="mt-4 ml-6 space-y-2">
          {item.subItems.map((subItem) => (
            <div key={subItem.id} className="flex items-center justify-between bg-gray-50 p-2 rounded">
              <div>
                <span className="text-sm font-medium text-gray-700">{subItem.title}</span>
                {subItem.url && (
                  <span className="text-xs text-gray-500 ml-2">{subItem.url}</span>
                )}
              </div>
              <button
                onClick={() => onDeleteSubItem(item.id, subItem.id)}
                className="text-red-500 hover:text-red-700 text-xs"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add Sub Item Form */}
      {showSubForm && (
        <div className="mt-4 ml-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <SubItemForm
            onSave={(subItem) => {
              onAddSubItem(item.id, subItem);
              setShowSubForm(false);
            }}
            onCancel={() => setShowSubForm(false)}
          />
        </div>
      )}
    </div>
  );
}

// Menu Item Form Component
function MenuItemForm({ 
  item, 
  onSave, 
  onCancel, 
  title 
}: {
  item?: MenuItem;
  onSave: (item: any) => void;
  onCancel: () => void;
  title: string;
}) {
  const [formData, setFormData] = useState({
    title: item?.title || '',
    url: item?.url || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (item) {
      onSave({ ...item, ...formData });
    } else {
      onSave(formData);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Menu Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL (optional)
            </label>
            <input
              type="text"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="/page-url or https://example.com"
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Sub Item Form Component
function SubItemForm({ 
  onSave, 
  onCancel 
}: {
  onSave: (item: Omit<MenuItem, 'id'>) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="Sub menu title"
          required
        />
      </div>
      
      <div>
        <input
          type="text"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          placeholder="URL (optional)"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </form>
  );
}
