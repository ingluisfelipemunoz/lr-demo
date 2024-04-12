import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_PROJECT_URL";
const supabaseKey = "YOUR_SUPABASE_PROJECT_API_KEY";

const supabase = null; //(supabaseUrl, supabaseKey);

class SupabaseService {
  async getEntities(entityName, page, pageSize, filters) {
    const query = supabase
      .from(entityName)
      .select("*, relatedTable1(*), relatedTable2(*)", { count: "exact" })
      .order("id", { ascending: true })
      .range((page - 1) * pageSize, page * pageSize - 1);

    if (filters.query) {
      query.ilike("name", `%${filters.query}%`);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key !== "query" && value) {
        if (Array.isArray(value)) {
          query.in(key, value);
        } else {
          query.eq(key, value);
        }
      }
    });

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    return { data, count };
  }

  async getEntitiesV2(entityName, page, pageSize, filters, relations = []) {
    let query = supabase
      .from(entityName)
      .select("*", { count: "exact" })
      .order("id", { ascending: true })
      .range((page - 1) * pageSize, page * pageSize - 1);

    relations.forEach((relation) => {
      query = query.select(`*, ${relation}(*)`);
    });

    if (filters.query) {
      query = query.ilike("name", `%${filters.query}%`);
    }

    Object.entries(filters).forEach(([key, value]) => {
      if (key !== "query" && value) {
        if (Array.isArray(value)) {
          query = query.in(key, value);
        } else {
          query = query.eq(key, value);
        }
      }
    });

    const { data, count, error } = await query;

    if (error) {
      throw error;
    }

    return { data, count };
  }

  async createEntity(entityName, entityData) {
    const { data, error } = await supabase
      .from(entityName)
      .insert(entityData)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async updateEntity(entityName, entityId, entityData) {
    const { data, error } = await supabase
      .from(entityName)
      .update(entityData)
      .eq("id", entityId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  }

  async deleteEntity(entityName, entityId) {
    const { data, error } = await supabase
      .from(entityName)
      .delete()
      .eq("id", entityId);

    if (error) {
      throw error;
    }

    return data;
  }
}

export const supabaseService = new SupabaseService();
