import fs from 'fs';
import path from 'path';
import { Types } from 'mongoose';
import logger from '~/config/winston';
import type * as t from '~/types';

/**
 * File system storage for memory entries
 */
export class MemoryFileStorage {
  private memoryDir: string | null;
  private getMemoryDirFn?: () => string;

  constructor(memoryDir?: string | (() => string)) {
    if (typeof memoryDir === 'function') {
      this.getMemoryDirFn = memoryDir;
      this.memoryDir = null;
    } else {
      this.memoryDir = memoryDir || null;
      if (this.memoryDir && !fs.existsSync(this.memoryDir)) {
        fs.mkdirSync(this.memoryDir, { recursive: true });
      }
    }
  }

  private getMemoryDirectory(): string {
    if (this.memoryDir) {
      return this.memoryDir;
    }
    if (this.getMemoryDirFn) {
      this.memoryDir = this.getMemoryDirFn();
      if (!fs.existsSync(this.memoryDir)) {
        fs.mkdirSync(this.memoryDir, { recursive: true });
      }
      return this.memoryDir;
    }
    // Fallback to default path
    const defaultPath = path.join(process.cwd(), 'Memory');
    if (!fs.existsSync(defaultPath)) {
      fs.mkdirSync(defaultPath, { recursive: true });
    }
    return defaultPath;
  }

  /**
   * Get the user's memory directory path
   */
  private getUserMemoryDir(userId: string | Types.ObjectId): string {
    const userIdStr = userId.toString();
    const baseDir = this.getMemoryDirectory();
    const userDir = path.join(baseDir, userIdStr);
    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }
    return userDir;
  }

  /**
   * Get the file path for a memory entry
   */
  private getMemoryFilePath(userId: string | Types.ObjectId, key: string): string {
    const userDir = this.getUserMemoryDir(userId);
    // Key is already validated to only contain lowercase letters and underscores
    // Use key directly as filename for simplicity
    return path.join(userDir, `${key}.json`);
  }

  /**
   * Get all memory files for a user
   */
  private getUserMemoryFiles(userId: string | Types.ObjectId): string[] {
    const userDir = this.getUserMemoryDir(userId);
    if (!fs.existsSync(userDir)) {
      return [];
    }
    return fs.readdirSync(userDir).filter((file) => file.endsWith('.json'));
  }

  /**
   * Create a memory entry
   */
  async createMemory({
    userId,
    key,
    value,
    tokenCount = 0,
  }: t.SetMemoryParams): Promise<t.MemoryResult> {
    try {
      if (key?.toLowerCase() === 'nothing') {
        return { ok: false };
      }

      const filePath = this.getMemoryFilePath(userId, key);
      if (fs.existsSync(filePath)) {
        throw new Error('Memory with this key already exists');
      }

      const memoryEntry: t.IMemoryEntryLean = {
        _id: new Types.ObjectId(),
        userId: typeof userId === 'string' ? new Types.ObjectId(userId) : userId,
        key,
        value,
        tokenCount,
        updated_at: new Date(),
      };

      fs.writeFileSync(filePath, JSON.stringify(memoryEntry, null, 2), 'utf8');
      return { ok: true };
    } catch (error) {
      throw new Error(
        `Failed to create memory: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Set or update a memory entry
   */
  async setMemory({
    userId,
    key,
    value,
    tokenCount = 0,
  }: t.SetMemoryParams): Promise<t.MemoryResult> {
    try {
      if (key?.toLowerCase() === 'nothing') {
        return { ok: false };
      }

      const filePath = this.getMemoryFilePath(userId, key);
      const userIdObj = typeof userId === 'string' ? new Types.ObjectId(userId) : userId;

      let memoryEntry: t.IMemoryEntryLean;
      if (fs.existsSync(filePath)) {
        // Update existing
        const existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
        memoryEntry = {
          ...existingData,
          value,
          tokenCount,
          updated_at: new Date(),
        };
      } else {
        // Create new
        memoryEntry = {
          _id: new Types.ObjectId(),
          userId: userIdObj,
          key,
          value,
          tokenCount,
          updated_at: new Date(),
        };
      }

      fs.writeFileSync(filePath, JSON.stringify(memoryEntry, null, 2), 'utf8');
      return { ok: true };
    } catch (error) {
      throw new Error(
        `Failed to set memory: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Delete a memory entry
   */
  async deleteMemory({ userId, key }: t.DeleteMemoryParams): Promise<t.MemoryResult> {
    try {
      const filePath = this.getMemoryFilePath(userId, key);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        return { ok: true };
      }
      return { ok: false };
    } catch (error) {
      throw new Error(
        `Failed to delete memory: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }

  /**
   * Get all memory entries for a user
   */
  async getAllUserMemories(userId: string | Types.ObjectId): Promise<t.IMemoryEntryLean[]> {
    try {
      const files = this.getUserMemoryFiles(userId);
      const memories: t.IMemoryEntryLean[] = [];

      for (const file of files) {
        try {
          const filePath = path.join(this.getUserMemoryDir(userId), file);
          const fileContent = fs.readFileSync(filePath, 'utf8');
          const memoryEntry = JSON.parse(fileContent) as t.IMemoryEntryLean;
          // Ensure userId is ObjectId
          if (typeof memoryEntry.userId === 'string') {
            memoryEntry.userId = new Types.ObjectId(memoryEntry.userId);
          }
          // Ensure _id is ObjectId
          if (typeof memoryEntry._id === 'string') {
            memoryEntry._id = new Types.ObjectId(memoryEntry._id);
          }
          // Ensure updated_at is Date
          if (typeof memoryEntry.updated_at === 'string') {
            memoryEntry.updated_at = new Date(memoryEntry.updated_at);
          }
          memories.push(memoryEntry);
        } catch (error) {
          logger.error(`Failed to read memory file ${file}:`, error);
        }
      }

      return memories;
    } catch (error) {
      throw new Error(
        `Failed to get all memories: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
