//
//  SettingsView.swift
//  Catalyst
//
//  Created by Sangeeta Papinwar on 05/06/23.
//

import SwiftUI
import ActivityIndicatorView

struct SettingsView: View {
    
    @State var showIndicator = false
    
    @State private var showingSheet = false
    
    @State private var connected = "Connect"
    
    var body: some View {
        GeometryReader { geo in
            VStack(alignment: .leading) {
                HStack {
                    Text("Greetings,")
                        .font(.largeTitle)
                        .fontWeight(.semibold)
                        .padding(.leading)

                    Spacer()
                }
                .padding(.top)
                
                Text("Jane Doe")
                    .font(.largeTitle)
                    .fontWeight(.semibold)
                    .padding(.leading)
                    .underline(color: .blue)
                
                ZStack {
                    RoundedRectangle(cornerRadius: 40)
                        .foregroundColor(.primary.opacity(0.1))
                    
                    VStack(alignment: .leading) {
                        HStack {
                            ZStack {
                                Circle()
                                    .foregroundColor(.blue.opacity(0.5))
                                    .frame(width: 50, height: 50)

                                Image("shams")
                                    .resizable()
                                    .frame(width: 45, height: 45)
                                    .foregroundColor(.secondary)
                            }

                            Spacer()
                        }
                        
                        Spacer()

                        Text("Jane Doe")
                            .font(.system(size: 18))
                            .fontWeight(.semibold)
                        
                        HStack {
                            Text("johndoe@gmail.com")
                                .font(.system(size: 16))
                                .fontWeight(.medium)
                                .foregroundColor(.gray)
                            
                            Spacer()
                            
                            Image(systemName: "arrow.right")
                                .foregroundColor(.gray)
                        }

                    }
                    .padding()
                    .padding(.vertical)
                    
                }
                .frame(height: geo.size.height * 0.25)
                
                HStack {
                    VStack {
                        
                        Button(action: {
                            
                        }) {
                            SettingsButton(imageName: "key.viewfinder", title: "Security", localImage: false)
                        }
                        
                        Button(action: {
                            showingSheet.toggle()
                            DispatchQueue.main.asyncAfter(deadline: .now() + 1.0) {
                                connected = "jane.eth"
                            }
                        }) {
                            SettingsButton(imageName: "walletconnect", title: connected, localImage: true)
                        }
                    }
                    Button(action: {
                        showIndicator = true
                        DispatchQueue.main.asyncAfter(deadline: .now() + 5) {
                            showIndicator = false
                        }
                    }) {
                        ZStack {
                            RoundedRectangle(cornerRadius: 30)
                                .foregroundColor(.primary.opacity(0.1))
                            
                            VStack {
                                HStack {
                                if showIndicator {
                                    ActivityIndicatorView(isVisible: $showIndicator, type: .arcs(count: 3, lineWidth: 2))
                                        .frame(width: 50, height: 50)
                                } else {
                                        Image(systemName: "arrow.triangle.2.circlepath.circle.fill")
                                            .resizable()
                                            .renderingMode(.original)
                                            .foregroundColor(.blue)
                                            .frame(width: 40, height: 40)
                                    }
                                    Spacer()
                                }
                                
                                Spacer()
                                
                                HStack {
                                    Text("Sync")
                                        .font(.system(size: 18))
                                        .fontWeight(.semibold)
                                        .foregroundColor(.primary)
                                    
                                    Spacer()
                                    
                                    Image(systemName: "arrow.right")
                                        .foregroundColor(.gray)
                                }
                            }
                            .padding()
                            .padding(.vertical)
                            
                        }
                    }
                }
                .sheet(isPresented: $showingSheet) {
                            WalletConnectView()
                        }
                
                Spacer()
            }
          
        }
    }
}

struct SettingsButton: View {
    let imageName: String
    let title: String
    let localImage: Bool
    
    var body: some View {
        ZStack {
            RoundedRectangle(cornerRadius: 30)
                .foregroundColor(.primary.opacity(0.1))
            
            VStack {
                HStack {
                    if localImage {
                        Image(imageName)
                            .resizable()
                            .foregroundColor(.secondary)
                        
                            .frame(width: 40, height: 40)
                    } else if (imageName == "key.viewfinder") {
                        Image(systemName: imageName)
                            .resizable()
                            .renderingMode(.original)
                            .foregroundColor(.blue.opacity(0.9))
                            .frame(width: 40, height: 40)
                            
                    } else {
                        Image(systemName: imageName)
                            .resizable()
                            .renderingMode(.original)
                            .foregroundColor(.blue)
                            .frame(width: 40, height: 40)
                    }
                    Spacer()
                }
                
                
                Spacer()
                
                HStack {
                    Text(title)
                        .font(.system(size: 18))
                        .fontWeight(.semibold)
                        .foregroundColor(.primary)
                    
                    Spacer()
                    
                    Image(systemName: "arrow.right")
                        .foregroundColor(.gray)
                }
            }
            .padding()
            .padding(.vertical)
            
        }
    }
}

struct SettingsView_Previews: PreviewProvider {
    static var previews: some View {
        SettingsView()
    }
}
