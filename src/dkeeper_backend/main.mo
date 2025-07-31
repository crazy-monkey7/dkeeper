import Buffer "mo:base/Buffer";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";

persistent actor DKeeper {
    // Define the Note type
    type Note = {
        title: Text;
        content: Text;
    };

    // Declare variables as transient since they will be modified
    transient var notes : [Note] = [];
    
    // Helper variable to track the next ID
    transient var nextId : Nat = 0;

    // Create a new note
    public func createNote(titleText: Text, contentText: Text) : async Nat {
        Debug.print("🔵 createNote called with title: " # titleText);
        Debug.print("🔵 createNote called with content: " # contentText);
        
        let newNote : Note = {
            title = titleText;
            content = contentText;
        };
        
        // Convert stable array to buffer for manipulation
        let buffer = Buffer.fromArray<Note>(notes);
        buffer.add(newNote);
        
        // Convert back to array and store in stable variable
        notes := Buffer.toArray(buffer);
        
        let id = nextId;
        nextId += 1;
        
        Debug.print("✅ Note created with ID: " # Nat.toText(id));
        Debug.print("📊 Total notes count: " # Nat.toText(notes.size()));
        
        id
    };

    // Read all notes
    public query func readNotes() : async [Note] {
        Debug.print("📖 readNotes called - returning " # Nat.toText(notes.size()) # " notes");
        notes
    };

    // Remove a note by index
    public func removeNote(id: Nat) : async () {
        Debug.print("🗑️ removeNote called with ID: " # Nat.toText(id));
        Debug.print("📊 Current notes count before removal: " # Nat.toText(notes.size()));
        
        if (id < notes.size()) {
            let buffer = Buffer.fromArray<Note>(notes);
            let _ = buffer.remove(id);
            notes := Buffer.toArray(buffer);
            
            Debug.print("✅ Note removed successfully");
            Debug.print("📊 Remaining notes count: " # Nat.toText(notes.size()));
        } else {
            Debug.print("❌ Error: Note ID " # Nat.toText(id) # " does not exist");
        };
    };
}
