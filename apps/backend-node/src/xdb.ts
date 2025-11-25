// apps/backend-node/src/xdb.ts
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let _sb: SupabaseClient | null = null;
function sb() {
  if (!_sb) {
    _sb = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE!
    );
  }
  return _sb!;
}

export const db = {
  async saveMessage(user_phone: string, text: string, raw: any) {
    await sb().from("messages").insert({ user_phone, text, raw });
  },
  async insertSale(user_phone: string, parsed: any) {
    await sb().from("sales").insert({
      user_phone,
      item: parsed.item,
      amount: parsed.amount,
      currency: parsed.currency,
    });
  },
  async insertExpense(user_phone: string, parsed: any) {
    await sb().from("expenses").insert({
      user_phone,
      item: parsed.item,
      amount: parsed.amount,
      currency: parsed.currency,
    });
  },
  async insertProduct(p: any) {
    const { data, error } = await sb()
      .from("products")
      .insert(p)
      .select("*")
      .single();
    if (error) throw error;
    return data;
  },
  async listProducts() {
    const { data, error } = await sb()
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data;
  },
  async getProduct(id: string) {
    const { data, error } = await sb()
      .from("products")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    return data;
  },
  async sumCards() {
    const sum = async (fn: string) => {
      const { data, error } = await sb().rpc(fn);
      if (error) return 0;
      return Number(data || 0);
    };
    const [sales, expenses] = await Promise.all([
      sum("sum_sales"),
      sum("sum_expenses"),
    ]);
    const profit = sales - expenses;
    const { data: top } = await sb().rpc("top_products");
    return {
      total_sales: sales,
      total_expenses: expenses,
      profit,
      top_products: top || [],
    };
  },
};
