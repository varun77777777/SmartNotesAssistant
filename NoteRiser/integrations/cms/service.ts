import { items } from "@wix/data";
import { WixDataItem } from ".";


/**
 * Generic CRUD Service class for Wix Data collections
 * Provides type-safe CRUD operations with error handling
 */
export class BaseCrudService {
  /**
   * Creates a new item in the collection
   * @param itemData - Data for the new item (single reference fields should be IDs: string)
   * @param multiReferences - Multi-reference fields as Record<fieldName, arrayOfIds>
   * @returns Promise<T> - The created item
   */
  static async create<T extends WixDataItem>(
    collectionId: string,
    itemData: Partial<T> | Record<string, unknown>,
    multiReferences?: Record<string, any>
  ): Promise<T> {
    try {
      const result = await items.insert(collectionId, itemData as Record<string, unknown>);

      if (multiReferences && Object.keys(multiReferences).length > 0 && result._id) {
        for (const [propertyName, refIds] of Object.entries(multiReferences)) {
          await items.insertReference(collectionId, propertyName, result._id, refIds as string[]);
        }
      }

      return result as T;
    } catch (error) {
      // Should consider reverting the insert with a remove in order to prevent partial insert.
      console.error(`Error creating ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to create ${collectionId}`
      );
    }
  }

  /**
   * Retrieves all items from the collection
   * @param collectionId - The collection to query
   * @param includeReferencedItems - Array of reference field names to populate
   * @returns Promise<items.WixDataResult<T>> - Query result with all items
   */
  static async getAll<T extends WixDataItem>(
    collectionId: string,
    includeReferencedItems?: string[]
  ): Promise<items.WixDataResult<T>> {
    try {
      let query = items.query(collectionId);

      // Use Wix's built-in include() method for referenced data
      if (includeReferencedItems && includeReferencedItems.length > 0) {
        query = query.include(...includeReferencedItems);
      }

      const result = await query.find();
      return result as items.WixDataResult<T>;
    } catch (error) {
      console.error(`Error fetching ${collectionId}s:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to fetch ${collectionId}s`
      );
    }
  }

  /**
   * Retrieves a single item by ID
   * @param collectionId - The collection to query
   * @param itemId - ID of the item to retrieve
   * @param includeReferencedItems - Array of reference field names to populate
   * @returns Promise<T | null> - The item or null if not found
   */
  static async getById<T extends WixDataItem>(
    collectionId: string,
    itemId: string,
    includeReferencedItems?: string[]
  ): Promise<T | null> {
    try {
      let query = items.query(collectionId).eq("_id", itemId);

      // Use Wix's built-in include() method for referenced data
      if (includeReferencedItems && includeReferencedItems.length > 0) {
        query = query.include(...includeReferencedItems);
      }

      const result = await query.find();

      if (result.items.length > 0) {
        return result.items[0] as T;
      }
      return null;
    } catch (error) {
      console.error(`Error fetching ${collectionId} by ID:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to fetch ${collectionId}`
      );
    }
  }

  /**
   * Updates an existing item
   * @param itemData - Updated item data (must include _id, only include fields to update)
   * @returns Promise<T> - The updated item
   */
  static async update<T extends WixDataItem>(collectionId: string, itemData: T): Promise<T> {
    try {
      if (!itemData._id) {
        throw new Error(`${collectionId} ID is required for update`);
      }

      const currentItem = await this.getById<T>(collectionId, itemData._id);

      const mergedData = { ...currentItem, ...itemData };

      const result = await items.update(collectionId, mergedData);
      return result as T;
    } catch (error) {
      console.error(`Error updating ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to update ${collectionId}`
      );
    }
  }

  /**
   * Deletes an item by ID
   * @param itemId - ID of the item to delete
   * @returns Promise<T> - The deleted item
   */
  static async delete<T extends WixDataItem>(collectionId: string, itemId: string): Promise<T> {
    try {
      if (!itemId) {
        throw new Error(`${collectionId} ID is required for deletion`);
      }

      const result = await items.remove(collectionId, itemId);
      return result as T;
    } catch (error) {
      console.error(`Error deleting ${collectionId}:`, error);
      throw new Error(
        error instanceof Error ? error.message : `Failed to delete ${collectionId}`
      );
    }
  }

}
