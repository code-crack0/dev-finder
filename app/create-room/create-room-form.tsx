'use client';
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { createRoomAction } from "./actions";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
const formSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(100),
  githubRepo: z.string().min(1).max(100),
    language: z.string().min(1).max(100),
})

export default function CreateRoomForm() {
    const {toast} = useToast(); 
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          name: "",
          description: "",
            githubRepo: "",
            language: ""
        },
      })
      async function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO: invoke a serve action to store the data in the table room
        const room = await createRoomAction(values);
        toast({
          title:"Room Created",
          description: "Your room has been created successfully",
        });
        router.push(`/rooms/${room.id}`);
      }
    return (
        <div >

        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is you public room name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
         <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Please describe your room.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
         <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the link to your github repository.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
         <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
              <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input  {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>
              <FormDescription>
                List you programming languages, frameworks, libraries so people can find our content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
          />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
          </div>
    )
}
