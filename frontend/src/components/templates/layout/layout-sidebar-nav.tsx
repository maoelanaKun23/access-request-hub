import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import type { ComponentProps, FC } from "react";

interface Items {
  title: string;
  url: string;
  icon: FC<ComponentProps<"svg">> | null | undefined;
  items?: Items[];
}

type LayoutSidebarNavProps = {
  items: Items[];
};

export const LayoutSidebarNav = ({ items }: LayoutSidebarNavProps) => {
  const navigate = useNavigate();
  const { open } = useSidebar();

  const pathname = useRouterState().location.pathname;

  const isActive = (url: string) => pathname === url;

  const isParentActive = (item: Items): boolean => {
    return item.items?.some(
      (sub) => isActive(sub.url) || isParentActive(sub)
    ) ?? false;
  };

  return (
    <SidebarGroup className="p-0 overflow-x-hidden">
      <SidebarMenu>
        {items.map((item) => {
          const parentActive = isActive(item.url) || isParentActive(item);

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={parentActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                {/* ===== PARENT ===== */}
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    className={cn(
                      "mx-2 my-1 px-4 h-10 flex items-center gap-2 rounded-xl",
                      "w-[calc(100%-1rem)] overflow-hidden",
                      "transition-all duration-200 hover:bg-primary/80",
                      parentActive &&
                      "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md",
                      !open &&
                      "justify-center group-data-[collapsible=icon]:!w-full"
                    )}
                    onClick={() => {
                      if (!item.items) navigate({ to: item.url });
                    }}
                  >
                    {typeof item.icon === "string" ? (
                      <img src={item.icon} className="w-5 h-5" />
                    ) : (
                      item.icon && <item.icon />
                    )}
                    <span className={cn("font-semibold", !open && "hidden")}>
                      {item.title}
                    </span>

                    {item.items && (
                      <ChevronDown
                        className={cn(
                          "ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-180",
                          !open && "hidden"
                        )}
                      />
                    )}
                  </SidebarMenuButton>
                </CollapsibleTrigger>

                {/* ===== CHILD ===== */}
                {item.items && (
                  <CollapsibleContent>
                    <SidebarMenuSub className="mx-0 px-0 border-none">
                      {item.items.map((subItem) => {
                        const subActive = isActive(subItem.url);

                        return (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton
                              className={cn(
                                "mx-2 my-1 pl-8 pr-4 h-10 flex items-center gap-2 rounded-xl",
                                "w-[calc(100%-1rem)] overflow-hidden",
                                "transition-all duration-200 hover:bg-primary/80",
                                subActive &&
                                "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm"
                              )}
                              asChild
                            >
                              <Link to={subItem.url}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                )}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};