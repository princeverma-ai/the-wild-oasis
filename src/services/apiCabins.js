import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
    const { data, error } = await supabase.from("cabins").select("*");
    if (error) {
        console.error(error);
        throw new Error("Cabins could not be loaded");
    }
    return data;
}

export async function createEditCabin(newCabin, id) {
    const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
    const imageName = `${Math.random()}-${newCabin.image.name}`.replace(
        "/",
        ""
    );

    const imagePath = hasImagePath
        ? newCabin.image
        : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    //https://gzoeslnyfpacnjgxihyf.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg?t=2024-12-17T14%3A09%3A20.006Z

    // create or edit cabin here
    let query = supabase.from("cabins");
    if (!id) {
        query = query.insert([{ ...newCabin, image: imagePath }]);
    } else {
        query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
    }
    const { data, error } = await query.select().single();
    if (error) {
        console.log(error);
        throw new Error("Cabins could not be created");
    }

    //upload image
    if (hasImagePath) return data;

    const { error: storageError } = await supabase.storage
        .from("cabin-images")
        .upload(imageName, newCabin.image);

    //delete the cabin if storage error
    if (storageError) {
        await supabase.from("cabins").delete().eq("id", data.id);
        console.log(error);
        throw new Error("Cabins image could not be uploaded");
    }

    return data;
}

export async function deleteCabin(id) {
    const { data, error } = await supabase.from("cabins").delete().eq("id", id);
    if (error) {
        console.log(error);
        throw new Error("Cabins could not be deleted");
    }
}
